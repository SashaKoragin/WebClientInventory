export class AdressInventarka {
    //public host = 'i7751-w00000745';
    public host = 'localhost';
    public autificationInventar = `http://${this.host}:8182/Inventarka/Authorization`;
    public alluser = `http://${this.host}:8182/Inventarka/AllUsers`;
    public allotdelget = `http://${this.host}:8182/Inventarka/AllOtdels`;
}