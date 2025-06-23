import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/users">Users Table</Link></li>
          <li><Link to="/charts">Charts</Link></li>
          <li><Link to="/calendar">Calendar</Link></li>
          <li><Link to="/kanban">Kanban Board</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;