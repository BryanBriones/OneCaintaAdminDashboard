var isActiveOptions = { "true" : "true", "false": "false"};
$(document).ready(function() {

    var columnDefs = [
        {
        data: "OrgID",
        title: "Org ID",
        type: "num",
        disabled: true
        },
        {
        data: "MunicipalGovOffice",
        title: "Municipal Gov Office",
        required: true,
        maxlength: 200
        },
        {
        data: "MunicipalGovNames",
        title: "Municipal Gov Names",
        required: true
        },
        {
        data: "MunicipalGovDesc",
        title: "Municipal Gov Desc",
        required: true,
        type: "textarea"
        },
        {
        data: "MunicipalImg",
        title: "Municipal Img Link",
        required: true,
        render: function(data, type, row, meta) {
            if (data) return `<img style='max-width:300px;max-height:300px' src='${data}'></img> or <button onclick='window.open("${data}")'>Download</button>`;
        }
        },
        {
        data: "IsActive",
        title: "Is Active",
        type : "select",
        required: true,
        options : isActiveOptions,
        select2 : { width: "100%"},
        render: function (data, type, row, meta) {
            if (data == null || !(data in isActiveOptions)) return null;
            return isActiveOptions[data];
        }
        }
    ];

    var myTable;

    var url_get_all = 'http://localhost:3000/api/oneorgadmin';
    var url_add_update_delete = 'http://localhost:3000/api/oneorg/';




    myTable = $('#oneorganizationeditor').DataTable({
        "sPaginationType": "full_numbers",
        ajax: {
            url : url_get_all,
            // our data is an array of objects, in the root node instead of /data node, so we need 'dataSrc' parameter
            dataSrc : ''
        },
        columns: columnDefs,
        dom: 'Bfrtip',        // Needs button container
        select: 'single',
        responsive: true,
        altEditor: true,     // Enable altEditor
        closeModalOnSuccess: false,
        buttons: [
            {
                text: 'Add',
                name: 'add'        // do not change name
            },
            {
                extend: 'selected', // Bind to Selected row
                text: 'Edit',
                name: 'edit'        // do not change name
            },
            {
                extend: 'selected', // Bind to Selected row
                text: 'Delete',
                name: 'delete'      // do not change name
            },
            {
                text: 'Refresh',
                name: 'refresh'      // do not change name
            }
        ],
        onAddRow: function(datatable, rowdata, success, error) {
            $.ajax({
                // a tipycal url would be / with type='POST'
                url: url_add_update_delete,
                type: 'POST',
                data: rowdata,
                success: success,
                error: error
            });
        },
        onDeleteRow: function(datatable, rowdata, success, error) {
            $.ajax({
                // a tipycal url would be /{id} with type='DELETE'
                url: url_add_update_delete + rowdata.OrgID,
                type: 'DELETE',
                data: rowdata,
                success: success,
                error: error
            });
        },
        onEditRow: function(datatable, rowdata, success, error) {
            $.ajax({
                // a tipycal url would be /{id} with type='PUT'
                url: url_add_update_delete + rowdata.OrgID,
                type: 'PUT',
                data: rowdata,
                success: success,
                error: error
            });
        }
    });


});

