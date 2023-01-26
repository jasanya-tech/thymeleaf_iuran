const urlApi = "http://localhost:4040/api";

$(document).ready(function () {
  // Getting data from api with pagination
  class apiFetchPageinate {
    constructor(page = 0, size = 10, tableName) {
      this.page = page;
      this.size = size;
      this.tableName = tableName;
      this.init();
    }

    init() {
      let renameTable = this.tableName;
      thisTable.clear();
      $.get(`${urlApi}/${this.tableName}/views/page?page=${this.page}&size=${this.size}`,
        function (data) {
          let pageItem = "";
          for (let num = 0; num < data.totalPage; num++) {
            let no = num + 1;
            if (data.currentPage == num) {
              pageItem += `<li class="page-item active"><a class="page-link" href="#" data-page="${num}">${no}</a></li>`;
            } else {
              pageItem += `<li class="page-item"><a class="page-link" href="#" data-page="${num}">${no}</a></li>`;
            }
          }
          $(".pagination").html(pageItem);
          switch (renameTable) {
            case "provinces":
              provinces(data.data);
              break;
            case "cities":
              cities(data.data);
              break;
            case "houses":
              houses(data.data);
              break;
            case 'duesTypes':
              duesTypes(data.data);
              break
            default:
              alert(renameTable)
              break;
          }
        }
      );
    }
  }

  let size = $("#size").val();
  let currentPage = 0;
  const tableName = $("table").attr("data-table-name");
  const thisTable = $(`#${tableName}Table`).DataTable({
    paging: false,
    ordering: false,
    info: false,
  });
  // Fetching the data
  if (tableName != undefined) {
    new apiFetchPageinate(currentPage, size, tableName);
  }
  $("#size").on("change", function () {
    if ($(this).val().includes("."))
      return alert("Please input a number integer");
    size = $(this).val();
    new apiFetchPageinate(currentPage, $(this).val(), tableName);
  });
  $(".pagination").on("click", ".page-item a", function () {
    new apiFetchPageinate($(this).attr("data-page"), size, tableName);
  });

  // maping data province to datatable
  function provinces(data) {
    $.each(data, function (key, value) {
      thisTable.row
        .add([
          key + 1,
          value.provinceName,
          `<div class="d-flex justify-content-center gap-2">
          <a
            href="/admin/${tableName}/update/${value.id}"
            class="btn btn-sm btn-primary px-3"
            >Edit</a
          >
          <button type="button" id="hapus" data-id="${value.id}" class="btn btn-sm btn-danger">
            Hapus
          </button>
        </div>`
        ])
        .draw(false);
    });
  }

  // maping data city to datatable
  function cities(data) {
    $.each(data, function (key, value) {
      thisTable.row
        .add([
          key + 1,
          value.cityName,
          value.province ? value.province.provinceName : 'null',
          `<div class="d-flex justify-content-center gap-2">
          <a
            href="/admin/${tableName}/update/${value.id}"
            class="btn btn-sm btn-primary px-3"
            >Edit</a
          >
          <button type="button" id="hapus" data-id="${value.id}" class="btn btn-sm btn-danger">
            Hapus
          </button>
        </div>`
        ])
        .draw(false);
    });
  }

  // maping data house to datatable
  function houses(data) {
    $.each(data, function (key, value) {
      thisTable.row
        .add([
          key + 1,
          value.address,
          value.owner ? value.owner.fullName : "null",
          value.city ? value.city.cityName : "null",
          value.city ? value.city.province.provinceName : "null",
          `<div class="d-flex justify-content-center gap-2">
          <a
            href="/admin/${tableName}/update/${value.id}"
            class="btn btn-sm btn-primary px-3"
            >Edit</a
          >
          <button type="button" id="hapus" data-id="${value.id}" class="btn btn-sm btn-danger">
            Hapus
          </button>
        </div>`
        ])
        .draw(false);
    });
  }

  // maping data dues type to datatable
  function duesTypes(data) {
    $.each(data, function (key, value) {
      thisTable.row
        .add([
          key + 1,
          value.duesName,
          value.cost,
          `<div class="d-flex justify-content-center gap-2">
          <a
            href="/admin/${tableName}/update/${value.id}"
            class="btn btn-sm btn-primary px-3"
            >Edit</a
          >
          <button type="button" id="hapus" data-id="${value.id}" class="btn btn-sm btn-danger">
            Hapus
          </button>
        </div>`
        ])
        .draw(false);
    });
  }

  // createing data
  $('form#create').on("submit", function (event) {
    let endPoint = $(this).attr("endpoint-name");
    event.preventDefault();
    let formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    $.ajax({
      type: "POST",
      url: `${urlApi}/${endPoint}`,
      data: JSON.stringify(data),
      dataType: "json",
      contentType: 'application/json',
      error: function (xhr) {
        alert(xhr.responseJSON.message)
      },
      success: function (response, status) {
        if (status == 'success') {
          window.location.href = '/admin/' + endPoint
          alert(`Data ${endPoint} berhasil di tambahkan`);
        }
      }
    });
  });

  // updateing data
  $('form#update').on("submit", function (event) {
    let endPoint = $(this).attr("endpoint-name");
    let id = $("input#dataId").val();
    event.preventDefault();
    let formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    $.ajax({
      type: "PUT",
      url: `${urlApi}/${endPoint}/${id}`,
      data: JSON.stringify(data),
      dataType: "json",
      contentType: 'application/json',
      error: function (xhr) {
        alert(xhr.responseJSON.message)
      },
      success: function (response, status) {
        if (status == 'success') {
          window.location.href = '/admin/' + endPoint
          alert(`Data ${endPoint} berhasil di update`);
        }
      }
    });
  });

  // delete one data by id
  $(`#${tableName}Table`).on('click', '#hapus', function () {
    if (confirm("yakin ingin menghapus data")) {
      let id = $(this).attr("data-id");
      $.ajax({
        type: "DELETE",
        url: `${urlApi}/${tableName}/${id}`,
        error: function (xhr) {
          alert(xhr.responseJSON.message)
        },
        success: function (response, status) {
          if (status == 'success') {
            alert(`Data ${tableName} berhasil di hapus`);
            new apiFetchPageinate(currentPage, size, tableName);
          }
        }
      });
    };
  })

  // get data when inside page is update
  if (window.location.pathname.includes('update')) {
    let dataId = $('#dataId').val();
    let endPoint = $('form').attr("endpoint-name");
    $.ajax({
      type: "GET",
      url: `${urlApi}/${endPoint}/${dataId}`,
      error: function (xhr) {
        alert(xhr.responseJSON.message)
      },
      success: function (response, status) {
        if (status == 'success') {
          Object.keys(response).forEach((key) => {
            switch ($(`#${key}`).prop("tagName")) {
              case "INPUT":
                $(`#${key}`).val(response[key]);
                break;
              case "SELECT":
                $.get(`${urlApi}/${$(`#${key}`).attr("tableName")}`, function (responseSelect) {
                  responseSelect.forEach((value) => {
                    if (response[key].id == value.id) {
                      $(`#${key}`).append(`<option selected value="${value.id}">${value.provinceName}</option>`);
                    } else {
                      $(`#${key}`).append(`<option value="${value.id}">${value.provinceName}</option>`);
                    }
                  })
                })
              default:
                break;
            }
          })
        }
      }
    })
  };

  if (window.location.pathname.includes('cities/create')) {
    $.get(`${urlApi}/provinces`, function (response) {
      response.forEach((value, key) => {
        $('#select-province').append(`<option value="${value.id}">${value.provinceName}</option>`);
      })
    })
  }
});