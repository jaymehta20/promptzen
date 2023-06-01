'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineContentCopy } from 'react-icons/md';
import { BsCheck } from 'react-icons/bs';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session, status } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState('');

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(''), 500);
  };

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push('/profile');

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  return (
    <div className="prompt_card flex flex-col gap-2">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          {copied === post.prompt ? (
            <BsCheck size="1.5rem" className="cursor-pointer" />
          ) : (
            <MdOutlineContentCopy size="1.5rem" className="cursor-pointer" />
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <p className={`my-4 font-satoshi text-md text-gray-700`}>
          {post.prompt}
        </p>
      </div>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer line-clamp-1"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag.includes('#') ? post.tag : `#${post.tag}`}
      </p>
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <AiOutlineEdit
            size="1.5rem"
            className="cursor-pointer"
            onClick={handleEdit}
          />
          <p>
            <AiOutlineDelete
              size="1.5rem"
              className="cursor-pointer"
              onClick={handleDelete}
            />
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
