import ListItem from './ListItem.jsx';
function Lists({ lists, onEditStart, onDelete }) {
  return (
    <ul className="flex flex-col gap-y-2">
      {lists.map((list) => (
        <ListItem
          list={list}
          key={list.id}
          onEditStart={onEditStart}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default Lists;
