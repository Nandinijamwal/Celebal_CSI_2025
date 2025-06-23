const UsersTable = () => {
  return (
    <div className="users-table">
      <h2>Users Table</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Alice</td><td>alice@example.com</td><td>Active</td></tr>
          <tr><td>Bob</td><td>bob@example.com</td><td>Inactive</td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;