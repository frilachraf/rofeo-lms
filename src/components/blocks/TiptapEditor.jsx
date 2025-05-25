// src/Tiptap.tsx
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ArrowsInLineVertical, ArrowUUpLeft, ArrowUUpRight, Code, CodeBlock, Eraser, ListBullets, ListNumbers, Paragraph, Quotes, TextB, TextH, TextHFive, TextHFour, TextHOne, TextHSix, TextHThree, TextHTwo, TextIndent, TextItalic, TextStrikethrough, Trash } from '@phosphor-icons/react'
// define your extension array
// const extensions = [StarterKit]


const TiptapEditor = ({content, onChange}) => {
  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    }
  })

  // onChange content
 
  return (
    <>
      {/* 
      
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
      {/* <div className="border p-2 rounded-md shadow-xs">
      <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content}></EditorProvider>
      </div> */}
      <div className='border p-2 rounded-md shadow-xs'>

        <MenuBar editor={editor} />
        {/* <Separator className='my-2' /> */}
        <EditorContent editor={editor} className='p-4'/>
      </div>
    </>
  )
}


export default TiptapEditor


const MenuBar = ({ editor }) => {

  if (!editor) {
    return null
  }

  return (
    <div className="control-group">
      <div className="button-group">
        <Button type='button' variant='ghost'
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <TextB size={20} />
        </Button>
        <Button type='button' variant='ghost'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <TextItalic size={20} />
        </Button>
        <Button type='button' variant='ghost'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <TextStrikethrough size={20} />
        </Button>
        <Button type='button' variant='ghost'
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          <Code size={20} />
        </Button>
        <Button type='button' variant='ghost' onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <Eraser size={20} />
        </Button>
        <Button type='button' variant='ghost' onClick={() => editor.chain().focus().clearNodes().run()}>
          <Trash size={20} />
        </Button>
        <Button type='button' variant='ghost'
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          <Paragraph size={20} />
        </Button>
        <Button type='button' variant='ghost'
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          <TextHOne size={20} />
        </Button>
        <Button type='button' variant='ghost'
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          <TextHTwo size={20} />
        </Button>
        <Button type='button' variant='ghost'
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          <TextHThree size={20} />
        </Button>
        <Button type='button' variant='ghost'
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
        >
          <TextHFour size={20} />
        </Button>
        <Button type='button' variant='ghost'
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
        >
          <TextHFive size={20} />
        </Button>
        <Button type='button' variant='ghost'
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
        >
          <TextHSix size={20} />
        </Button>
        <Button type='button' variant='ghost'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <ListBullets size={20} />
        </Button>
        <Button type='button' variant='ghost'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <ListNumbers size={20} />
        </Button>
        <Button type='button' variant='ghost'
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <CodeBlock size={20} />
        </Button>
        <Button type='button' variant='ghost'
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          <Quotes size={20} />
        </Button>

        <Button type='button' variant='ghost' onClick={() => editor.chain().focus().setHardBreak().run()}>
          <ArrowsInLineVertical size={20} />
        </Button>
        <Button type='button' variant='ghost'
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          <ArrowUUpLeft size={20} />
        </Button>
        <Button type='button' variant='ghost'
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          <ArrowUUpRight size={20} />
        </Button>

      </div>
    </div>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]


export const ContentViewer = ({ html }) => {
  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
