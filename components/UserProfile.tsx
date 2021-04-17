import {User} from "../lib/user";

const UserProfile = ({user, children}: {user: User, children: any}) => {
    return (
        <div key={user.id}>
            <p>{user.username}</p>
            <p>{user.id}</p>
          {children}
      </div>
    );
}

export default UserProfile;
