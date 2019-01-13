package cc.ryanc.halo.model.request;

import lombok.Data;

/**
 * @author xin.leng
 * @title CommentR
 * @description 新增评论
 * @date 2019/1/11 17:02
 */
@Data
public class CommentR {

    private String openid;

    private Long postId;

    private String content;

    private Long parent;
}
