var isActiveOptions = { "true" : "true", "false": "false"};
var HourOptions = { "8AM": "8AM", "9AM": "9AM", "10AM": "10AM", "11AM": "11AM", "12PM": "12PM", "1PM" : "1PM", "2PM": "2PM", "3PM": "3PM", "4PM": "4PM", "5PM": "5PM", "6PM": "6PM", "7PM": "7PM", "8PM": "8PM", "9PM": "9PM", "10PM": "10PM", "11PM": "11PM", "12AM": "12AM", "1AM" : "1AM", "2AM": "2AM", "3AM": "3AM", "4AM": "4AM", "5AM": "5AM", "6AM": "6AM", "7AM": "7AM"};
var BusinessDayOptions = { "Monday" : "Monday", "Tuesday" : "Tuesday","Wednesday" : "Wednesday","Thursday" : "Thursday","Friday" : "Friday","Saturday" : "Saturday","Sunday" : "Sunday"};
$(document).ready(function() {

    var columnDefs = [
        {
        data: "BusinessID",
        title: "Business ID",
        type: "num",
        disabled: true
        },
        {
        data: "BusinessName",
        title: "Business Name",
        required: true,
        maxLength: 100
        },
        {
        data: "OpenHours",
        title: "Opening Hour",
        type : "select",
        required: true,
        options : HourOptions,
        select2 : { width: "100%"},
        render: function (data, type, row, meta) {
            if (data == null || !(data in HourOptions)) return null;
            return HourOptions[data];
        }
        },
        {
        data: "CloseHours",
        title: "Closing Hour",
        type : "select",
        required: true,
        options : HourOptions,
        select2 : { width: "100%"},
        render: function (data, type, row, meta) {
            if (data == null || !(data in HourOptions)) return null;
            return HourOptions[data];
        }
        },
        {
        data: "BusinessDayOpen",
        title: "Business Day Open",
        type : "select",
        required: true,
        options : BusinessDayOptions,
        select2 : { width: "100%"},
        render: function (data, type, row, meta) {
            if (data == null || !(data in BusinessDayOptions)) return null;
            return BusinessDayOptions[data];
        }
        },
        {
        data: "BusinessDayClose",
        title: "Business Day Close",
        type : "select",
        required: true,
        options : BusinessDayOptions,
        select2 : { width: "100%"},
        render: function (data, type, row, meta) {
            if (data == null || !(data in BusinessDayOptions)) return null;
            return BusinessDayOptions[data];
        }
        },
        {
        data: "ContactDetails",
        title: "Contact Details",
        required: true,
        maxLength: 100
        },
        {
        data: "BusinessDesc",
        title: "Business Description",
        required: true,
        type: "textarea"
        },
        {
        data: "BusinessLocation",
        title: "Business Location",
        required: true,
        maxLength: 200
        },
        {
        data: "BusinessCategory",
        title: "Business Category",
        required: true,
        maxLength: 100
        },
        {
        data: "BusinessImg",
        title: "Business Image Link",
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

    var url_get_all = 'http://localhost:3000/api/onenegosyoadmin';
    var url_add_update_delete = 'http://localhost:3000/api/onenegosyo/';




    myTable = $('#onenegosyoeditor').DataTable({
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
                url: url_add_update_delete + rowdata.BusinessID,
                type: 'DELETE',
                data: rowdata,
                success: success,
                error: error
            });
        },
        onEditRow: function(datatable, rowdata, success, error) {
            $.ajax({
                // a tipycal url would be /{id} with type='PUT'
                url: url_add_update_delete + rowdata.BusinessID,
                type: 'PUT',
                data: rowdata,
                success: success,
                error: error
            });
        }
    });


});

