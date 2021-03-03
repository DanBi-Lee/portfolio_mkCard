import { fetchImg } from "./api";

class SearchImage {
  constructor(selector) {
    this.$searchForm = document.querySelector(selector);
    this.$contentsBox = document.querySelector(".contents_imgbox");

    this.init();
  }

  init = () => {
    this.onSearch();
  };

  onSearch = () => {
    this.$searchForm.addEventListener("submit", this.getImage);
  };

  getImage = async (e) => {
    e.preventDefault();
    this.keyword = e.target.querySelector("#searchImg").value;
    const data = await fetchImg(this.keyword);
    const resultImage = data.hits;
    console.log(resultImage);
    this.render(resultImage);
  };

  render = (data) => {
    if (!data) {
      return;
    }
    if (data.length === 0) {
      this.$contentsBox.innerHTML = `
            <p>
                ${this.keyword}에 대한 검색 결과가 없습니다.
            </p>
        `;
    } else {
      this.$contentsBox.innerHTML = `
        <ul class="result_bg"></ul>
      `;
      const $ul = document.querySelector(".result_bg");
      $ul.innerHTML = data
        .map((item) => {
          return `
                <li>
                    <button style="background-image: url(${item.previewURL})" data-img="${item.largeImageURL}" class="search_item">
                    </button>
                </li>
            `;
        })
        .join("");
    }
  };
}

export default SearchImage;
