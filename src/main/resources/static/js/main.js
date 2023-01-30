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
      $.get(`${urlApi}/${renameTable.replace("_", "/")}/views/page?page=${this.page}&size=${this.size}`,
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
            case 'houses_monthlyDues':
              monthlyDues(data.data)
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
    currentPage = $(this).attr("data-page");
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
          value.street ? `${value.street} No.${value.houseNumber} RT ${value.rt} / RW ${value.rw}` : 'belum dilengkapi',
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

  function monthlyDues(data) {
    $.each(data, function (key, value) {
      thisTable.row
        .add([
          key + 1,
          value.houseName,
          value.owner,
          value.address,
          formatRupiah(value.totalCost, true),
          `<div class="d-flex justify-content-center gap-2">
          <a
            href="/admin/monthlyDues/detail/${value.id}"
            class="btn btn-sm btn-info px-3"
            >Detail</a
          >
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
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log(JSON.stringify(data));
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
    formData.forEach((value, key) => {
      data[key] = value
    });
    console.log(JSON.stringify(data))
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
            let tagName = $(`#${key}`).prop("tagName");
            switch (tagName) {
              case "INPUT":
                $(`#${key}`).val(response[key]);
                break;
              case "SELECT":
                let tableName = $(`#${key}`).attr("tableName");
                if (tableName == "cities") {
                  getDataOptionSelectProvince(response[key].province.id)
                  tableName = `cities/province/${response[key].province.id}`
                }
                $.get(`${urlApi}/${tableName}`, function (responseSelect) {
                  let inputName = $(`#${key}`).attr("name");
                  if (inputName == 'owner') {
                    inputName = 'full'
                  }
                  responseSelect.forEach((value) => {
                    if (response[key].id == value.id) {
                      $(`#${key}`).append(`<option selected value="${value.id}">${value[inputName + "Name"]}</option>`);
                    } else {
                      $(`#${key}`).append(`<option value="${value.id}">${value[inputName + "Name"]}</option>`);
                    }
                  })
                })
                break
              case "TEXTAREA":
                $(`#${key}`).html(response[key]);
                break
              default:
                break;
            }
          })
        }
      }
    })
  };

  // get data option of select province 
  function getDataOptionSelectProvince(provinceId) {
    $.get(`${urlApi}/provinces`, function (response) {
      response.forEach((valueResponse, keyResponse) => {
        if (provinceId == valueResponse.id) {
          $(`#province`).append(`<option selected value="${valueResponse.id}">${valueResponse["provinceName"]}</option>`);
        } else {
          $(`#province`).append(`<option value="${valueResponse.id}">${valueResponse[`provinceName`]}</option>`);
        }
      })
    })
  }

  // code run when province change selected
  $('#province').on('change', function () {
    let provinceId = $(this).val();
    $.get(`${urlApi}/cities/province/${provinceId}`, function (response) {
      $(`#city`).removeAttr('disabled');
      let options = `<option value="">Pilih salah satu</option>`;
      response.forEach((valueResponse, keyResponse) => {
        options += `<option value="${valueResponse.id}">${valueResponse[`cityName`]}</option>`;
      })
      $(`#city`).html(options);
    }).fail(function (err) {
      $(`#city`).html(`<option value="">Pilih salah satu</option>`);
      $(`#city`).attr('disabled', true);
      alert(JSON.parse(err.responseText).message);
    })
  })

  // code run when path indludes create name
  if (window.location.pathname.includes('create')) {
    // get data for select input
    $('select').each(function (key, value) {
      if (value.disabled) return;
      let nameId = value.id;
      let tableName = $(this).attr('tableName');
      $.get(`${urlApi}/${tableName}`, function (response) {
        response.forEach((valueResponse, keyResponse) => {
          $(`#${nameId}`).append(`<option value="${valueResponse.id}">${valueResponse[`${nameId}Name`]}</option>`);
        })
      })
    })
  }

  // Upload image source
  $("#pictureSource").on('change', function () {
    let houseId = $('#dataId').val();
    let formData = new FormData();
    let file = $(this)[0].files[0];
    formData.append('picture', file)
    if (file.size > 1000000) {
      alert("File terlalu besar maximal 1Mb")
    } else {
      $.ajax({
        type: "POST",
        url: `${urlApi}/houses/upload/source/${houseId}`,
        data: formData,
        contentType: false,
        processData: false,
        error: function (xhr) {
          alert(xhr.responseText)
        },
        success: function (response, status) {
          console.log(JSON.stringify(response))
          if (status == 'success') {
            alert(`Data image berhasil di tambahkan`);
            window.location.reload();
          }
        }
      });
    }
  })

  // Upload Picture to local directory API
  $("#pictureUpload").on('change', function () {
    let houseId = $('#dataId').val();
    let formData = new FormData();
    let file = $(this)[0].files[0];
    formData.append('picture', file)
    $.ajax({
      type: "POST",
      url: `${urlApi}/houses/upload/picture/${houseId}`,
      data: formData,
      contentType: false,
      processData: false,
      error: function (xhr) {
        alert(xhr.responseText)
      },
      success: function (response, status) {
        console.log(response)
        if (status == 'success') {
          alert(`Data image berhasil di upload`);
          window.location.reload();
        }
      }
    });
  })

  /* Fungsi formatRupiah */
  function formatRupiah(angka, prefix) {
    var number_string = angka.toString();
    split = number_string.split(',');
    sisa = split[0].length % 3;
    rupiah = split[0].substr(0, sisa);
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
  }

  // load data for detail monthly dues
  if (window.location.pathname.includes('/monthlyDues/detail') || window.location.pathname.includes('admin/houses/update')) {
    // inisialisasi swiper js for house pictures
    new Swiper(".picture-houses", {
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    });
    // Load data from API for content in detail page
    const fetchDetailMonthlyDuesHouse = () => {
      let houseId = $('#data-id').attr('data-houseId');
      $.get(`${urlApi}/houses/monthlyDues/detail/${houseId}`, function (response) {
        // console.log(JSON.stringify(response));
        response.pictures.forEach(function (value) {
          let pictureDiv = `<div class="swiper-slide">
                              <img src="${urlApi}${value}">
                            </div>`
          $('#picture-slides').append(pictureDiv)
        })
        $('#detail-houseName').html(response.houseName);
        $('#detail-owner').html(response.owner);
        $('#detail-totalOccupants').html(response.totalOccupants);
        $('#detail-address').html(response.address);
        $('#detail-city').html(response.cityName);
        $('#detail-province').html(response.provinceName);
        let totalCost = 0;
        duesDiv = ``;
        response.duesTypes.forEach(function (dues) {
          $(`#dues${dues.id}`).attr('checked', true);
          totalCost += parseInt(dues.cost);
          duesDiv += `<div class="col mt-3">
                    <table>
                      <tr>
                        <td>${dues.duesName}</td>
                      </tr>
                      <tr>
                        <td>${formatRupiah(dues.cost, true)}</td>
                      </tr>
                    </table>
                  </div>`;
        });
        $('#dues').html(duesDiv);
        $('#detail-totalCost').html(formatRupiah(totalCost, true));
      })
    }

    fetchDetailMonthlyDuesHouse();
    // load all dues type for form edit dues 
    $.get(`${urlApi}/duesTypes`, function (response) {
      response.forEach(function (value, key) {
        $('#data-dues').append(
          `<div class="col">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                name="duesType[]"
                value="${value.id}"
                id="dues${value.id}"
              />
              <label class="form-check-label" for="flexCheckDefault">
                ${value.duesName}
              </label>
            </div>
          </div>`
        );
      })
    });
    $('#data-dues').on('change', 'input[name="duesType[]"]', function () {

    })

    $("#form-dues").on("submit", function (e) {
      e.preventDefault();
      let duesTypes = { idDuesTypes: [] };
      let houseId = $("#data-id").attr("data-houseId");
      $.each(
        $('input[name="duesType[]"]:checked'),
        function (index, input) {
          duesTypes.idDuesTypes.push(input.value);
        }
      );
      $.ajax({
        type: "POST",
        url: `${urlApi}/houses/${houseId}/addDues`,
        data: JSON.stringify(duesTypes),
        dataType: "json",
        contentType: "application/json",
        error: function (xhr) {
          alert(xhr.responseText);
        },
        success: function (response, status) {
          console.log(JSON.stringify(response));
          if (status == "success") {
            $('#form-dues').addClass("d-none");
            $("#edit-dues").removeClass("d-none");
            alert(`Data iuran berhasil di update`);
            fetchDetailMonthlyDuesHouse()
          }
        },
      });
    });
  }

});