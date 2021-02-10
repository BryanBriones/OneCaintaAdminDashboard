var isActiveOptions = { "true" : "true", "false": "false"};
var ContactType = { "Landline" : "Landline", "Mobile" : "Mobile"};
var ContactAgency = { "EmergencyHotline" : "Emergency Hotline", "GovernmentHotline" : "Government Hotline"};
$(document).ready(function() {

    var columnDefs = [
        {
        data: "ContactID",
        title: "Contact ID",
        type: "num",
        disabled: true
        },
        {
        data: "ContactType",
        title: "Contact Type",
        type : "select",
        required: true,
        options : ContactType,
        select2 : { width: "100%"},
        render: function (data, type, row, meta) {
            if (data == null || !(data in ContactType)) return null;
            return ContactType[data];
        }
        },
        {
        data: "ContactAgency",
        title: "Contact Agency",
        type : "select",
        required: true,
        options : ContactAgency,
        select2 : { width: "100%"},
        render: function (data, type, row, meta) {
            if (data == null || !(data in ContactAgency)) return null;
            return ContactAgency[data];
        }
        },
        {
        data: "ContactAgencyName",
        title: "Contact Agency Name",
        required: true,
        maxLength: 100
        },
        {
        data: "ContactValue",
        title: "Contact Value",
        required: true,
        maxLength: 100
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

    var url_get_all = 'http://localhost:3000/api/contactsadmin';
    var url_add_update_delete = 'http://localhost:3000/api/contacts/';




    myTable = $('#contactdetailseditor').DataTable({
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
                url: url_add_update_delete + rowdata.ContactID,
                type: 'DELETE',
                data: rowdata,
                success: success,
                error: error
            });
        },
        onEditRow: function(datatable, rowdata, success, error) {
            $.ajax({
                // a tipycal url would be /{id} with type='PUT'
                url: url_add_update_delete + rowdata.ContactID,
                type: 'PUT',
                data: rowdata,
                success: success,
                error: error
            });
        }
    });


});

