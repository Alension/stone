package cc.ryanc.halo.web.controller.api;

import static java.util.stream.Collectors.toList;

import cc.ryanc.halo.model.domain.Category;
import cc.ryanc.halo.model.domain.Comment;
import cc.ryanc.halo.model.domain.Post;
import cc.ryanc.halo.model.dto.HaloConst;
import cc.ryanc.halo.model.dto.JsonResult;
import cc.ryanc.halo.model.dto.ListPage;
import cc.ryanc.halo.model.enums.BlogPropertiesEnum;
import cc.ryanc.halo.model.enums.CommentStatusEnum;
import cc.ryanc.halo.model.enums.PostStatusEnum;
import cc.ryanc.halo.model.enums.PostTypeEnum;
import cc.ryanc.halo.model.enums.ResponseStatusEnum;
import cc.ryanc.halo.model.request.LikeR;
import cc.ryanc.halo.model.request.UserR;
import cc.ryanc.halo.service.CategoryService;
import cc.ryanc.halo.service.PostService;
import cc.ryanc.halo.utils.CommentUtil;
import cn.hutool.core.util.StrUtil;
import io.swagger.models.auth.In;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

/**
 * <pre>
 *     文章API
 * </pre>
 *
 * @author : RYAN0UP
 * @date : 2018/6/6
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/api/post")
public class ApiPostController {

    @Autowired
    private PostService postService;

    @Autowired
    private CategoryService categoryService;

    /**
     * 获取文章列表 分页
     * @param page 页码
     * @return JsonResult
     */
    @GetMapping()
    public JsonResult posts(Long cateId,
            @RequestParam(defaultValue = "1") Integer page , @RequestParam(defaultValue = "10") Integer pageSize) {
        final Sort sort = new Sort(Sort.Direction.DESC, "postDate");
        final Pageable pageable = PageRequest.of(page - 1, pageSize, sort);
        Page<Post> posts ;
        if (StringUtils.isEmpty(cateId)){
             posts = postService.findPostByStatus(PostStatusEnum.PUBLISHED.getCode(), PostTypeEnum.POST_TYPE_POST.getDesc(), pageable);
        }else {
            final Category category = categoryService.findByCateId(cateId).orElse(null);
            if (category == null){
                return new JsonResult(ResponseStatusEnum.EMPTY.getCode(), ResponseStatusEnum.EMPTY.getMsg());
            }
             posts = postService.findPostByCategories(category , pageable);
        }
        if (null == posts) {
            return new JsonResult(ResponseStatusEnum.EMPTY.getCode(), ResponseStatusEnum.EMPTY.getMsg());
        }
        return new JsonResult(ResponseStatusEnum.SUCCESS.getCode(), ResponseStatusEnum.SUCCESS.getMsg(), posts);
    }

    /**
     * 获取单个文章信息
     * @param postId 文章编号
     * @return JsonResult
     */
    @GetMapping(value = "/{postId}")
    public JsonResult posts(@PathVariable(value = "postId") Long postId) {
        final Post post = postService.findByPostId(postId, PostTypeEnum.POST_TYPE_POST.getDesc());
        postService.cacheViews(post.getPostId());
        return new JsonResult(ResponseStatusEnum.SUCCESS.getCode(), ResponseStatusEnum.SUCCESS.getMsg(), post);
    }

    /**
     * 获取轮播图文章
     * @return JsonResult
     */
    @GetMapping(value = "/swiper")
    public JsonResult swiperPosts() {
        final List<Post> post = postService.getSwiperPosts();
        if (null != post) {
            return new JsonResult(ResponseStatusEnum.SUCCESS.getCode(), ResponseStatusEnum.SUCCESS.getMsg(), post);
        } else {
            return new JsonResult(ResponseStatusEnum.NOTFOUND.getCode(), ResponseStatusEnum.NOTFOUND.getMsg());
        }
    }

    @PostMapping(value = "/like")
    public JsonResult likePost(@RequestBody LikeR likeR) {
        return postService.likePost(likeR);
    }

}
