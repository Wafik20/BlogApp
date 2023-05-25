package dev.wafik.blog.controllers.post;

import dev.wafik.blog.model.Post;
import dev.wafik.blog.services.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostController {

    @Autowired
    private PostService postService;

    //create a post
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post newPost) {
        try {
            Post postCreated = postService.addPost(newPost);
            return new ResponseEntity<Post>(postCreated, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<Post>(HttpStatus.BAD_REQUEST);
        }
    }

    //get all posts
    @GetMapping("/all")
    public ResponseEntity<List<Post>> getAllPosts() {
        return new ResponseEntity<List<Post>>(postService.getPosts(), HttpStatus.OK);
    }

    //get post by id
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable("id") Integer postId) {
        try {
            if (postService.postExists(postId)) {
                throw new Exception("Post not found");
            }
            Post post = postService.getPostById(postId);
            return new ResponseEntity<Post>(post, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Post>(HttpStatus.NOT_FOUND);
        }
    }

    //get all user posts
    @GetMapping("/user")
    public ResponseEntity<List<Post>> getAllCurrentUserPosts() {
        return new ResponseEntity<List<Post>>(postService.getAllCurrentUserPosts(), HttpStatus.OK);
    }

    //update post
    // TBI
    @PutMapping("/{id}")
    public ResponseEntity<String> editPost(@PathVariable("id") Integer postId, @RequestBody Post postEdited) {
        try {
            if (!postService.postExists(postId)) {
                throw new Exception("Post not found");
            }
            Post post = postService.getPostById(postId);
            if (!postService.isCurrentUserPost(post)) {
                throw new Exception("You are not the author of this post");
            }
            postService.updatePost(postId, postEdited);
            return new ResponseEntity<String>("Updated post successfully:\n" + post.toString(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("Could not update post:\n" + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    //delete post
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable("id") Integer postId) {
        try {
            if (!postService.postExists(postId)) {
                throw new Exception("Post not found");
            }
            Post post = postService.getPostById(postId);
            if (!postService.isCurrentUserPost(post)) {
                throw new Exception("You are not the author of this post");
            }
            postService.deletePost(postId);
            return new ResponseEntity<String>("Post deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("Could not delete post:\n"+ e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
