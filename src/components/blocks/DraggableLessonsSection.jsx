import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DotsSixVertical, DotsThree, DotsThreeVertical, Plus } from '@phosphor-icons/react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from '../ui/button';
import { Trash, Loader2 } from 'lucide-react';
import { deleteLesson } from '../../services/coursesService';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
export function DraggableLessonsSection({lessons}) {
  const [items, setItems] = useState(lessons);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        console.log(active.id, over.id)
        // Console log the new positions
        // newItems.forEach((itemId, index) => {
        //   console.log(`Item ${itemId} is now at position ${index + 1}`);
        // });
        
        return newItems;
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        
                    </TableHead>
                    <TableHead>
                        Title
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((lesson,index) => (
                    <SortableItem key={lesson.id} id={lesson.id} data={lesson} order={index} />
                ))}
                
            </TableBody>
        </Table>
      </SortableContext>
    </DndContext>
  );
}


export function SortableItem({ id, data ,order}) {
    const [isDeleting, setIsDeleting] = useState(false)
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            await deleteLesson(data.id)

        } catch (error) {
            console.error(error)
        }finally {
            setIsDeleting(false)
        }
    }
    return (
        <TableRow ref={setNodeRef} style={style}>
            <TableCell {...attributes} {...listeners} style={{ cursor: 'grab' }} className="w-10 ">
                <DotsSixVertical size={24} className="text-muted-foreground"/>
            </TableCell>
            <TableCell>{data.title}</TableCell>
            
            <TableCell className='flex justify-end'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost"><DotsThreeVertical size={30} weight="bold"/></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
  }