import { useState, useEffect } from 'react'
import { ArrowLeft, Send, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Message {
  id: string
  listingId: string
  senderId: string
  receiverId: string
  message: string
  createdAt: string
}

interface Conversation {
  id: string
  listingId: string
  buyerId: string
  sellerId: string
  listingTitle: string
  listingPrice: number
  listingImage?: string
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
}

interface MessagesListProps {
  onBack: () => void
  currentUserId: string
}

// Sample data for demonstration
const sampleConversations: Conversation[] = [
  {
    id: '1',
    listingId: '1',
    buyerId: 'buyer1',
    sellerId: 'seller1',
    listingTitle: 'Remington 700 .308 Bolt Action Rifle',
    listingPrice: 850,
    listingImage: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400',
    lastMessage: 'Is this still available?',
    lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    unreadCount: 1
  },
  {
    id: '2',
    listingId: '2',
    buyerId: 'buyer2',
    sellerId: 'seller2',
    listingTitle: 'Mathews VXR 31.5 Compound Bow',
    listingPrice: 1200,
    listingImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    lastMessage: 'Thanks for the quick response!',
    lastMessageAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    unreadCount: 0
  }
]

const sampleMessages: Message[] = [
  {
    id: '1',
    listingId: '1',
    senderId: 'buyer1',
    receiverId: 'seller1',
    message: 'Hi! Is this rifle still available?',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    listingId: '1',
    senderId: 'seller1',
    receiverId: 'buyer1',
    message: 'Yes, it\'s still available! Are you interested?',
    createdAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    listingId: '1',
    senderId: 'buyer1',
    receiverId: 'seller1',
    message: 'Is this still available?',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  }
]

export function MessagesList({ onBack, currentUserId }: MessagesListProps) {
  const [conversations, setConversations] = useState<Conversation[]>(sampleConversations)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    if (selectedConversation) {
      // Load messages for selected conversation
      const conversationMessages = sampleMessages.filter(
        msg => msg.listingId === selectedConversation.listingId
      )
      setMessages(conversationMessages)
    }
  }, [selectedConversation])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: Message = {
      id: Date.now().toString(),
      listingId: selectedConversation.listingId,
      senderId: currentUserId,
      receiverId: currentUserId === selectedConversation.buyerId 
        ? selectedConversation.sellerId 
        : selectedConversation.buyerId,
      message: newMessage.trim(),
      createdAt: new Date().toISOString()
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')

    // Update conversation last message
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation.id 
        ? { ...conv, lastMessage: message.message, lastMessageAt: message.createdAt }
        : conv
    ))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (selectedConversation) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Chat Header */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
          <div className="container mx-auto px-4 h-16 flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedConversation(null)}
              className="flex items-center mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-3">
              {selectedConversation.listingImage && (
                <img 
                  src={selectedConversation.listingImage} 
                  alt={selectedConversation.listingTitle}
                  className="w-10 h-10 rounded-lg object-cover"
                />
              )}
              <div>
                <div className="font-medium text-sm">
                  {selectedConversation.listingTitle}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatPrice(selectedConversation.listingPrice)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-2xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderId === currentUserId
                      ? 'hunting-gradient text-white'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <div className="text-sm">{message.message}</div>
                  <div className={`text-xs mt-1 ${
                    message.senderId === currentUserId ? 'text-white/70' : 'text-muted-foreground'
                  }`}>
                    {formatTimeAgo(message.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="max-w-2xl mx-auto flex space-x-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="hunting-gradient text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Button variant="ghost" onClick={onBack} className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-semibold ml-4">Messages</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {conversations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg mb-2">No messages yet</div>
            <div className="text-sm text-muted-foreground">
              Start a conversation by messaging a seller about their item
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {conversations.map((conversation) => (
              <Card 
                key={conversation.id}
                className="cursor-pointer item-card-hover"
                onClick={() => setSelectedConversation(conversation)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    {/* Listing Image */}
                    {conversation.listingImage ? (
                      <img 
                        src={conversation.listingImage} 
                        alt={conversation.listingTitle}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <User className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}

                    {/* Conversation Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-sm truncate">
                          {conversation.listingTitle}
                        </h3>
                        <div className="text-xs text-muted-foreground">
                          {formatTimeAgo(conversation.lastMessageAt)}
                        </div>
                      </div>
                      
                      <div className="text-sm text-primary font-medium mb-2">
                        {formatPrice(conversation.listingPrice)}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </div>
                        {conversation.unreadCount > 0 && (
                          <Badge className="ml-2 bg-primary text-primary-foreground">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}