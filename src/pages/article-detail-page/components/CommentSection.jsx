import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommentSection = ({ articleId }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: {
        name: "Budi Santoso",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg"
      },
      content: "Artikel yang sangat informatif! Terima kasih sudah berbagi informasi yang bermanfaat ini.",
      timestamp: new Date(Date.now() - 3600000),
      likes: 12,
      replies: [
        {
          id: 11,
          author: {
            name: "Sari Dewi",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg"
          },
          content: "Setuju sekali dengan Pak Budi. Artikelnya mudah dipahami.",
          timestamp: new Date(Date.now() - 1800000),
          likes: 3
        }
      ]
    },
    {
      id: 2,
      author: {
        name: "Ahmad Rahman",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg"
      },
      content: "Menarik sekali pembahasan ini. Apakah ada sumber referensi tambahan yang bisa dibaca?",
      timestamp: new Date(Date.now() - 7200000),
      likes: 8,
      replies: []
    },
    {
      id: 3,
      author: {
        name: "Maya Putri",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg"
      },
      content: "Terima kasih atas artikelnya. Sangat membantu untuk memahami situasi terkini.",
      timestamp: new Date(Date.now() - 10800000),
      likes: 15,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} menit yang lalu`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} jam yang lalu`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} hari yang lalu`;
    }
  };

  const handleSubmitComment = (e) => {
    e?.preventDefault();
    if (!newComment?.trim()) return;

    const comment = {
      id: Date.now(),
      author: {
        name: "Anda",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleSubmitReply = (e, commentId) => {
    e?.preventDefault();
    if (!replyText?.trim()) return;

    const reply = {
      id: Date.now(),
      author: {
        name: "Anda",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      content: replyText,
      timestamp: new Date(),
      likes: 0
    };

    setComments(comments?.map(comment => 
      comment?.id === commentId 
        ? { ...comment, replies: [...comment?.replies, reply] }
        : comment
    ));
    
    setReplyText('');
    setReplyingTo(null);
  };

  const handleLike = (commentId, isReply = false, parentId = null) => {
    if (isReply) {
      setComments(comments?.map(comment => 
        comment?.id === parentId 
          ? {
              ...comment,
              replies: comment?.replies?.map(reply =>
                reply?.id === commentId
                  ? { ...reply, likes: reply?.likes + 1 }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments?.map(comment => 
        comment?.id === commentId 
          ? { ...comment, likes: comment?.likes + 1 }
          : comment
      ));
    }
  };

  return (
    <div className="mt-12">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="MessageSquare" size={20} className="text-primary" />
        <h2 className="font-heading font-bold text-xl md:text-2xl text-text-primary">
          Komentar ({comments?.reduce((total, comment) => total + 1 + comment?.replies?.length, 0)})
        </h2>
      </div>
      {/* Comment Form */}
      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <form onSubmit={handleSubmitComment}>
          <div className="flex space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Your avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Tulis komentar Anda..."
                value={newComment}
                onChange={(e) => setNewComment(e?.target?.value)}
                className="mb-3"
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  disabled={!newComment?.trim()}
                  iconName="Send"
                  iconPosition="left"
                >
                  Kirim Komentar
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Comments List */}
      <div className="space-y-6">
        {comments?.map((comment) => (
          <div key={comment?.id} className="bg-card border border-border rounded-lg p-4">
            {/* Comment Header */}
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={comment?.author?.avatar}
                  alt={comment?.author?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-body font-semibold text-text-primary">
                    {comment?.author?.name}
                  </span>
                  <span className="text-xs font-caption text-text-secondary">
                    {formatTimeAgo(comment?.timestamp)}
                  </span>
                </div>
                <p className="font-body text-text-primary leading-relaxed">
                  {comment?.content}
                </p>
              </div>
            </div>

            {/* Comment Actions */}
            <div className="flex items-center space-x-4 ml-13">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(comment?.id)}
                iconName="ThumbsUp"
                iconPosition="left"
                className="text-text-secondary hover:text-primary"
              >
                {comment?.likes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyingTo(replyingTo === comment?.id ? null : comment?.id)}
                iconName="Reply"
                iconPosition="left"
                className="text-text-secondary hover:text-primary"
              >
                Balas
              </Button>
            </div>

            {/* Reply Form */}
            {replyingTo === comment?.id && (
              <div className="mt-4 ml-13">
                <form onSubmit={(e) => handleSubmitReply(e, comment?.id)}>
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="Your avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        type="text"
                        placeholder="Tulis balasan..."
                        value={replyText}
                        onChange={(e) => setReplyText(e?.target?.value)}
                        className="mb-2"
                      />
                      <div className="flex space-x-2">
                        <Button
                          type="submit"
                          variant="default"
                          size="sm"
                          disabled={!replyText?.trim()}
                        >
                          Balas
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyText('');
                          }}
                        >
                          Batal
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Replies */}
            {comment?.replies?.length > 0 && (
              <div className="mt-4 ml-13 space-y-4">
                {comment?.replies?.map((reply) => (
                  <div key={reply?.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={reply?.author?.avatar}
                        alt={reply?.author?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-body font-semibold text-sm text-text-primary">
                          {reply?.author?.name}
                        </span>
                        <span className="text-xs font-caption text-text-secondary">
                          {formatTimeAgo(reply?.timestamp)}
                        </span>
                      </div>
                      <p className="font-body text-sm text-text-primary leading-relaxed mb-2">
                        {reply?.content}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(reply?.id, true, comment?.id)}
                        iconName="ThumbsUp"
                        iconPosition="left"
                        className="text-text-secondary hover:text-primary"
                      >
                        {reply?.likes}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;