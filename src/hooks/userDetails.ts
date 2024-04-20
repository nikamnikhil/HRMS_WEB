export const userDetails = () => {
    const userData: any = localStorage.getItem('userData');
    const userObj = JSON.parse(userData);

    return userObj;
}
