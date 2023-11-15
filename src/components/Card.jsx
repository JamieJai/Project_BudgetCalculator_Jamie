import React, { useState, useRef, useMemo } from 'react';
import Input from './Input.jsx';
import Button from './Button.jsx';
import Lists from './Lists.jsx';
import { IoMdSend } from 'react-icons/io';
import { FaDumpster, FaPencilAlt } from 'react-icons/fa';

const initialLists = localStorage.getItem('budgets')
  ? JSON.parse(localStorage.getItem('budgets'))
  : [];

function Card() {
  const titleRef = useRef();
  const budgetRef = useRef();
  const idRef = useRef();
  const [lists, setLists] = useState(initialLists);
  const [isEditing, setIsEditing] = useState(false);

  const budgetSum = useMemo(() => {
    return lists.reduce((sum, list) => sum + list.budget, 0);
  }, [lists]);

  const handleSubmit = () => {
    const title = titleRef.current.value;
    const budget = parseInt(budgetRef.current.value, 10);

    if (!title || !budget) {
      alert('');
      return false;
    }

    setLists((prevLists) => {
      const newLists = [...prevLists, { id: Date.now(), title, budget }];
      localStorage.setItem('budgets', JSON.stringify(newLists));
      return newLists;
    });

    // 필드 초기화
    titleRef.current.value = '';
    budgetRef.current.value = '';
  };

  const handleEditStart = (id) => {
    let targetList = lists.find((list) => list.id === id);
    titleRef.current.value = targetList.title;
    budgetRef.current.value = targetList.budget;
    idRef.current = id;

    setIsEditing(true);
  };

  const handleEdit = () => {
    const title = titleRef.current.value;
    const budget = parseInt(budgetRef.current.value, 10);
    const id = idRef.current;

    if (!title || !budget) {
      alert('');
      return false;
    }

    setLists((prevLists) => {
      const updatedLists = prevLists.map((list) => {
        if (list.id === id) {
          return { ...list, title, budget };
        }
        return list;
      });

      localStorage.setItem('budgets', JSON.stringify(updatedLists));
      return updatedLists;
    });

    setIsEditing(false);

    // 필드 초기화
    titleRef.current.value = '';
    budgetRef.current.value = '';
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete')) {
      setLists((prevLists) => {
        const updatedLists = prevLists.filter((list) => list.id !== id);
        localStorage.setItem('budgets', JSON.stringify(updatedLists));
        return updatedLists;
      });
    }

    return false;
  };

  const handleDeleteAll = () => {
    if (confirm('Are you sure you want to delete')) {
      setLists([]);
      return true;
    }

    return false;
  };

  let ListActionButton = (
    <Button title="제출" onClick={handleSubmit}>
      <IoMdSend />
    </Button>
  );

  if (isEditing) {
    ListActionButton = (
      <Button title="수정" onClick={handleEdit}>
        <FaPencilAlt />
      </Button>
    );
  }

  return (
    <div className="flex  flex-col gap-y-6 w-full mx-auto rounded shadow-2xl max-w-2xl bg-slate-200 p-8">
      <div className="flex justify-between gap-x-4 ">
        <Input
          label="지출 항목"
          type="text"
          placeholder="예) 렌트비"
          ref={titleRef}
        />
        <Input
          label="비용"
          type="number"
          min="0"
          step="100"
          placeholder="0"
          ref={budgetRef}
        />
      </div>
      <p>{ListActionButton}</p>
      <Lists
        lists={lists}
        onEditStart={handleEditStart}
        onDelete={handleDelete}
      />
      <div className="flex items-center justify-between">
        <Button title="목록 지우기" onClick={handleDeleteAll}>
          <FaDumpster />
        </Button>
        <h3 className="text-xl">
          총 <span>{budgetSum}</span>원
        </h3>
      </div>
    </div>
  );
}

export default Card;
