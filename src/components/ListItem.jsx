import { FaPencilAlt, FaDumpster } from 'react-icons/fa';
function ListItem({ list, onEditStart, onDelete }) {
  return (
    <li className="flex justify-between items-center border border-slate-300 p-4 hover:scale-105 transition-all">
      <p className="w-1/2 overflow-hidden whitespace-nowrap overflow-ellipsis">
        {list.title}
      </p>
      <p className="flex-1">{list.budget}</p>
      <div className="flex gap-x-2">
        <FaPencilAlt
          className="text-green-600 cursor-pointer"
          onClick={() => onEditStart(list.id)}
        />
        <FaDumpster
          className="text-red-400 cursor-pointer"
          onClick={() => onDelete(list.id)}
        />
      </div>
    </li>
  );
}

export default ListItem;
