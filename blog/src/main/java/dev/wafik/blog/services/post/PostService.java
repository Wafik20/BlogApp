package dev.wafik.blog.services.post;

import dev.wafik.blog.model.Post;
import dev.wafik.blog.model.PostStatus;
import dev.wafik.blog.repositories.PostRepository;
import dev.wafik.blog.services.CurrentUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class PostService {
    final CurrentUserService currentUserService = new CurrentUserService();

    @Autowired
    private PostRepository posts;

    public Post addPost(Post newPost) {
        Post postCreated = Post.builder()
                .title(newPost.getTitle())
                .description(newPost.getDescription())
                .postStatus(newPost.getPostStatus())
                .body(newPost.getBody())
                .slug(newPost.getSlug())
                .author(currentUserService.getCurrentUser())
                .build();
        posts.save(postCreated);
        return postCreated;
    }

    public List<Post> getPosts() {
        return posts.findAll();
    }

    public Post getPostById(Integer id) {
        return posts.findById(id).orElseThrow();
    }

    public boolean postExists(Integer id) {
        return posts.existsById(id);
    }

    public List<Post> getAllCurrentUserPosts() {
        Integer curr_user_id = currentUserService.getCurrentUser().getId();
        return posts.findAllByAuthor_Id(curr_user_id);
    }

    public boolean isCurrentUserPost(Post post) {
        Integer curr_user_id = currentUserService.getCurrentUser().getId();
        Integer post_author_id = post.getAuthor().getId();
        return curr_user_id.equals(post_author_id);
    }

    public void updatePost(Integer postId, Post updatedPost) {
        Post post = posts.findById(postId).orElseThrow();

        if (!(updatedPost.getTitle() == null)) {
            post.setTitle(updatedPost.getTitle());
        }
        if (!(updatedPost.getDescription() == null)) {
            post.setDescription(updatedPost.getDescription());
        }
        if (!(updatedPost.getBody() == null)) {
            post.setBody(updatedPost.getBody());
        }
        if (!(updatedPost.getSlug() == null)) {
            post.setSlug(updatedPost.getSlug());
        }
        if (!(updatedPost.getPostStatus() == null)) {
            post.setPostStatus(updatedPost.getPostStatus());
        }
        posts.save(post);
    }

    public void deletePost(Integer postId) {
        posts.deleteById(postId);
    }

}

