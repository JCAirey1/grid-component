new Vue({
    el: '#app',
    data: {
        searchText: '',
        gridData: [
            { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
            { id: 2, name: 'Jane Doe', age: 25, email: 'jane@example.com' },
            { id: 3, name: 'Bob Smith', age: 40, email: 'bob@example.com' }
        ],
        columns: [
            { name: 'id', datatype: 'string', width: 100, label: 'ID' },
            { name: 'name', datatype: 'string', width: 150, label: 'Name' },
            { name: 'age', datatype: 'number', width: 100, label: 'Age' },
            { name: 'email', datatype: 'string', width: 100, label: 'Email' },
        ],
        gridProps: {
            sortable: true,
            filterable: true,
            showfilterrow: true,
            groupable: true
        }
    },
    mounted() {
        console.log(`#app mounted`);
    },
    computed: {
        filteredData() {
            return this.gridData.filter(item => {
                return item.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
                       item.email.toLowerCase().includes(this.searchText.toLowerCase());
            });
        }
    },
    methods: {
        logout() {
            console.log('Logged out');
        }
    }
});