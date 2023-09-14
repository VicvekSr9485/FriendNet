export const fetchUser = () => {
    try {
        const userJSON = localStorage.getItem('user');

        if (userJSON !== null) {
            const userInfo = JSON.parse(userJSON);
            return userInfo;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}
