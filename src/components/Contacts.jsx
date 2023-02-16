import('./Contacts.scss');


export default function Contacts({ users, handleDeleteUser }) {


    const deleteUser = (e) => {
        let currentId = parseInt(e.target.id);
        handleDeleteUser(currentId);
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Phone Number</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>

                {users.map(user =>
                    <tr id={user.id} key={user.id}>
                        <td value={user.name}>{(user.name).split(' ')[0]}</td>
                        <td>{(user.name).split(' ')[1]}</td>
                        <td>{user.phone}</td>
                        <td><input id={user.id} type='button' value='Delete' onClick={deleteUser} /></td>
                    </tr>)}

            </tbody>
        </table >
    );
}