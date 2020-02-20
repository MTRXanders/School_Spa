
export default class UserModel {
    constructor() {
        this.id='';
        this.userName='';
        this.firstName='';
        this.lastName = '';
        this.patronymic = '';
        this.gender = '';
        this.uniqId = '';
        this.roles = [];
        this.email = '';
        this.age = 0;
        this.belongings='';
    }
   // validate() {
   //     const arrayRequired = [this.UserName, this.Gender, this.FirstName, this.LastName];
   //     const maxLenght = { FirstName: 40, Lastname: 40, Patronymic:60, UniqId:16,}
   //     for (prop in this) {
   //
   //     }
   // }
}