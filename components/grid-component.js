Vue.component('grid-component', {
    props: {
        data: {
            type: Array,
            required: true
        }, 
        idPrefix : {
            type: String,
            required: true,
            attribute: 'id-prefix'
        },
        props : {
            type: Object,
            default: () => ({ 
                sortable: false,
                filterable: false 
            }) // Default grid properties
        },
        columns: {
            type: Array,
            required: true,
            validator: function(value) {
                // Check if value is an array
                if (!Array.isArray(value)) {
                    console.error('Columns must be an array');
                    return false;
                }
                // Check if each object in the array has name and label properties
                for (let i = 0; i < value.length; i++) {
                    if (!value[i].name || !value[i].label) {
                        console.error('Each column object must have name and label properties');
                        return false;
                    }
                }
                return true;
            }
        }
    },
    template: `
        <div :ref="gridRef" class="jqxGrid"></div>
    `,
    mounted() {
        this.renderGrid();
    },
    computed: {
        gridRef() {
            return this.idPrefix + 'Grid';
        }
    },
    methods: {
        renderGrid() {
            const source = {
                localdata: this.data,
                datatype: 'array',
                datafields: this.columns.map(function(field) {
                    return { name: field.name, type: field.datatype };
                })
            };

            const dataAdapter = new jqx.dataAdapter(source);

            let columns = this.columns.map(function(field) {
                var column = {
                  text: field.label || field.name,
                  datafield: field.name,
                  width: field.width || 100
                };
                // Set renderer based on datatype
                switch (field.datatype) {
                  case 'checkbox':
                    column.cellsrenderer = function(row, columnfield, value, defaulthtml, columnproperties) {
                      return '<div style="margin-top: 6px; text-align: center;"><input type="checkbox" ' + (value ? 'checked' : '') + ' disabled /></div>';
                    };
                    break;
                  case 'date':
                    column.cellsformat = 'yyyy-MM-dd'; // You can customize the date format here
                    break;
                  case 'image':
                    column.cellsrenderer = function(row, columnfield, value, defaulthtml, columnproperties) {
                      return '<div style="margin-top: 6px; text-align: center;"><img src="' + value + '" style="max-height: 100px; max-width: 100px;" /></div>';
                    };
                    break;
                  // Add additional cases for other datatypes as needed
                }
                return column;
            });

            this.grid = new jqxGrid(this.$refs[this.gridRef], {
                width: '100%',
                height: '400px',
                source: dataAdapter,
                sortable: this.props.sortable,
                filterable: this.props.filterable,
                showfilterrow: this.props.filterable && this.props.showfilterrow,
                groupable: this.props.groupable,
                columns: columns
            });

            console.log('init grid');
            console.log(this.grid);
        },
        refreshGrid() {
            this.grid.source = {
                localdata: this.data,
                datatype: 'array',
                datafields: this.columns.map(function(field) {
                    return { name: field.name, type: field.datatype };
                })
            };
            this.grid.updatebounddata();
        }
    },
    watch: {
        data: {
            handler() {
                this.refreshGrid();
            },
            deep: true // Watch for changes deeply
        }
    }
});
