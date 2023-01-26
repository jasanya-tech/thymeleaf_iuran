
export const urlApi = "http://localhost:4040/api";

export default class Paging {
  constructor(page = 0, size = 10, tableName = null) {
    this.page = page;
    this.size = size;
    this.tableName = tableName;
  }
  fetchData(page = 0, size = 10, tab = null) {
    $(`#${id}Table`).clear();
    $.get(`${urlApi}/houses/views/page?page=${page}&size=${size}`,
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

      }
    );
  }
}