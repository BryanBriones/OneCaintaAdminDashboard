var isActiveOptions = { "true" : "true", "false": "false"};
$(document).ready(function() {

    var columnDefs = [
        {
        data: "NewsID",
        title: "News ID",
        type: "num",
        disabled: true
        },
        {
        data: "Headline",
        title: "Headline",
        required: true,
        maxLength: 100
        },
        {
        data: "NewsPreviewText",
        title: "News Preview Text",
        required: true,
        type: "textarea"
        },
        {
        data: "NewsBodyText",
        title: "News Body Text",
        required: true,
        type: "textarea"
        },
        {
        data: "NewsDate",
        title: "News Date",
        type: "date",
        dateFormat : "MM/DD/YYYY", 
        placeholder: "MM/DD/YYYY",
        required: true,
        render: function(data, type, row, meta) {
            if (moment(data)) return moment(data).format("MM/DD/YYYY");
  
        }

        },
        {
        data: "HeadlineImg",
        title: "Headline Image Link",
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

    var url_get_all_news = 'http://localhost:3000/api/newsadmin';
    var url_add_update_delete_news = 'http://localhost:3000/api/news/';




    myTable = $('#example').DataTable({
        "sPaginationType": "full_numbers",
        ajax: {
            url : url_get_all_news,
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
                url: url_add_update_delete_news,
                type: 'POST',
                data: rowdata,
                success: success,
                error: error
            });
        },
        onDeleteRow: function(datatable, rowdata, success, error) {
            $.ajax({
                // a tipycal url would be /{id} with type='DELETE'
                url: url_add_update_delete_news + rowdata.NewsID,
                type: 'DELETE',
                data: rowdata,
                success: success,
                error: error
            });
        },
        onEditRow: function(datatable, rowdata, success, error) {
            $.ajax({
                // a tipycal url would be /{id} with type='PUT'
                url: url_add_update_delete_news + rowdata.NewsID,
                type: 'PUT',
                data: rowdata,
                success: success,
                error: error
            });
        }
    });


});

