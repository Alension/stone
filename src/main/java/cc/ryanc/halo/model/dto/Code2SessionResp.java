package cc.ryanc.halo.model.dto;

import lombok.Data;

/**
 * @author xin.leng
 * @title Code2SessionResp
 * @description
 * @date 2019/1/9 21:06
 */
@Data
public class Code2SessionResp {

    private String openid;

    private String session_key;
}
