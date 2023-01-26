$.ajax({
  type:"GET",
  dataType: "json",
  url:"http://localhost:4040/api/houses/views/page?page=0&size=2",
  success: data => {
    console.log(data.houses);
  }
});

$(document).ready(function () {
  let size = $("#size").val();
  let currentPage = 0;
  const myTable = $("#housesTable").DataTable({
    paging: false,
    ordering: false,
    info: false,
  });
  $("#size").on("change", function () {
    if ($(this).val().includes("."))
      return alert("Please input a number integer");
    size = $(this).val();
    fetchData(currentPage, $(this).val());
  });
  $(".pagination").on("click", ".page-item a", function () {
    fetchData($(this).attr("data-page"), size);
  });
  fetchData(currentPage, size);
  function fetchData(page = 0, size = 10) {
    myTable.clear();
    $.get(
      `http://localhost:4040/api/houses/views/page?page=${page}&size=${size}`,
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
        $.each(data.houses, function (key, value) {
          myTable.row
            .add([
              key + 1,
              value.address,
              value.owner ? value.owner.fullName : "null",
              value.city ? value.city.cityName : "null",
              value.city ? value.city.province.provinceName : "null",
            ])
            .draw(false);
        });
      }
    );
  }
});