$(document).ready(function () {
  var url = window.location.search;
  var postId;


  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId);
  }

  // Getting jQuery references to the post body, title, form, and category select
  var bodyInput = $("#body");
  var titleInput = $("#titlePD");
  //var cmsForm = $("#postData");
  var userNameInput = $('#userName');
  var postCategorySelect = $("#category");
  // Setting the default value of the category dropdown selector
  postCategorySelect.val("TV Shows");
  // Adding an event listener for when the form is submitted
  // $(cmsForm).on("submit", function handleFormSubmit(event) {
  //   event.preventDefault();
  //   // Wont submit the post if we are missing a body or a title
  //   if (!titleInput.val().trim() || !bodyInput.val().trim()) {
  //     return;
  //   }
  //   // Constructing a newPost object to hand to the database
  //   var newPost = {
  //     title: titleInput.val().trim(),
  //     body: bodyInput.val().trim(),
  //     category: postCategorySelect.val()
  //   };

  //   console.log(newPost);

  //   // If we're updating a post run updatePost to update a post
  //   // Otherwise run submitPost to create a whole new post
  //   if (updating) {
  //     newPost.id = postId;
  //     updatePost(newPost);
  //   } else {
  //     submitPost(newPost);
  //   }
  // });

  // Submits a new post and brings user to blog page upon completion
  // function submitPost(Post) {
  //   $.post("/api/posts/", Post, function () {
  //     window.location.href = "/blog";
  //   });
  // }

  // Gets post data for a post if we're editing
  function getPostData(id) {
    $.get("/api/posts/" + id, function (data) {
      if (data) {
        console.log(data);
        var test = data.body;
        // If this post exists, prefill our cms forms with its data
        titleInput.text(data.title);
        bodyInput.html(test.replace(/\n/g, '<br>'));
        postCategorySelect.text(data.category);

        var formattedDate = new Date(data.createdAt);
        formattedDate = moment(formattedDate).startOf('hour').fromNow();;
        userNameInput.html(formattedDate + " - " + data.userName);



        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        //updating = true;
      }
    });
  }

  // Update a given post, bring user to the blog page when done
  // function updatePost(post) {
  //   $.ajax({
  //       method: "PUT",
  //       url: "/api/posts",
  //       data: post
  //     })
  //     .then(function () {
  //       window.location.href = "/blog";
  //     });
  // }
});