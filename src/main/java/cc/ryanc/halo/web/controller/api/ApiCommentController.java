package cc.ryanc.halo.web.controller.api;

import static java.util.stream.Collectors.toList;

import cc.ryanc.halo.model.domain.Comment;
import cc.ryanc.halo.model.domain.Post;
import cc.ryanc.halo.model.dto.JsonResult;
import cc.ryanc.halo.model.dto.ListPage;
import cc.ryanc.halo.model.enums.CommentStatusEnum;
import cc.ryanc.halo.model.enums.PostTypeEnum;
import cc.ryanc.halo.model.enums.ResponseStatusEnum;
import cc.ryanc.halo.service.CommentService;
import cc.ryanc.halo.utils.CommentUtil;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * <pre>
 *     评论API
 * </pre>
 *
 * @author : RYAN0UP
 * @date : 2018/6/6
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/api/comment")
public class ApiCommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/")
    public JsonResult findCommentsByPost(Long postId,  @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size) {
        List<Comment> comments = commentService.findCommentsByPostAndCommentStatus(postId,
                CommentStatusEnum.PUBLISHED.getCode());
        comments = CommentUtil.getComments(comments).stream().skip((page - 1) * size).limit(size).collect(toList());
        return new JsonResult(ResponseStatusEnum.SUCCESS.getCode(), ResponseStatusEnum.SUCCESS.getMsg(), comments);
    }
}
