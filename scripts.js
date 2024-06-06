$(function () {
  $("#date-from, #date-to").datepicker();

  let currentIndex = 0;
  const increment = 8;
  let data = [];
  let isListView = true;

  function loadPosts() {
    $.getJSON("data.json", function (response) {
      data = response;
      displayPosts();
    });
  }

  function displayPosts() {
    const postsContainer = $("#posts-container");
    for (
      let i = currentIndex;
      i < currentIndex + increment && i < data.length;
      i++
    ) {
      const post = data[i];
      const postHtmlList = `
              <div class="post">
                  <img src="${post.image}" alt="photo">
                  <div class="post-info">
                    <h5 class="post-label">Today</h5>
                    <div class="mui-icons">
                      <span class="material-icons small-icon">favorite</span>
                      <strong>${post.likes}</strong>
                      <span class="material-icons small-icon">comment</span>
                      <strong>${post.comments}</strong>
                    </div>
                  </div>
                  <div class="post-info">
                    <h5 class="post-label">9-06-2016</h5>
                    <div class="mui-icons">
                      <span class="material-icons small-icon">favorite</span>
                      <strong>${post.likes_on_date}</strong>
                      <span class="material-icons small-icon">comment</span>
                      <strong>${post.comments_on_date}</strong>
                    </div>
                  </div>
                  <div class="post-info">
                    <h5 class="post-label">Image upload</h5>
                    <strong>11-04-2016</strong>
                  </div>
              </div>
          `;

      const postHtmlСard = `
          <div class="post">
              <img src="${post.image}" alt="photo">
              <div class="post-info-card">
              <div class="post-info">
                <h5 class="post-label">Today</h5>
                <div class="mui-icons">
                  <p>
                  <span class="material-icons small-icon">favorite</span>
                  <strong>${post.likes}</strong>
                  </p>
                  <p>
                  <span class="material-icons small-icon">comment</span>
                  <strong>${post.comments}</strong>
                  </p>
                  <h5 class="post-label" style="font-size: 14px; padding: 20px 0">Image upload</h5>
                </div>
              </div>
              <div class="post-info">
                <h5 class="post-label">9-06-2016</h5>
                <div class="mui-icons">
                  <p>
                  <span class="material-icons small-icon">favorite</span>
                  <strong>${post.likes_on_date}</strong>
                  </p>
                  <p>
                  <span class="material-icons small-icon">comment</span>
                  <strong>${post.comments_on_date}</strong>
                  </p>
                  <p style="font-size: 14px; padding: 20px 0; font-weight: 600; margin: 0">11-04-2016</p>
                </div>
              </div>
              </div>
          </div>
      `;
      const postHtml = isListView ? postHtmlList : postHtmlСard;
      postsContainer.append(postHtml);
    }
    currentIndex += increment;

    if (currentIndex >= data.length) {
      $("#load-more-btn").hide();
    } else {
      $("#load-more-btn").show(); // Показываем кнопку только если есть еще элементы для загрузки
    }
  }

  $("#load-more-btn").on("click", function () {
    displayPosts();
  });

  loadPosts();

  const postsContainer = $("#posts-container");

  $("#list-view-btn").on("click", function () {
    $(this).addClass("active-btn");
    $("#card-view-btn").removeClass("active-btn");
    postsContainer.parent().removeClass("card-view").addClass("list-view");
    isListView = true;
    currentIndex = 0;
    postsContainer.empty();
    loadPosts();
  });

  $("#card-view-btn").on("click", function () {
    $(this).addClass("active-btn");
    $("#list-view-btn").removeClass("active-btn");
    postsContainer.parent().removeClass("list-view").addClass("card-view");
    isListView = false;
    currentIndex = 0;
    postsContainer.empty();
    loadPosts();
  });
});
