package cc.ryanc.halo.model.dto;

import cc.ryanc.halo.model.domain.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.validation.constraints.NotBlank;
import lombok.Data;

/**
 * @author xin.leng
 * @title UserD
 * @description
 * @date 2019/1/17 17:53
 */
@Data
public class Site {

    private Integer publishPostNum;

    private Long viewNum;

    private Long likeNum;

}
