package testmybatis;

import com.alibaba.fastjson.JSON;
import com.cn.shike.dao.RestOrderMapper;
import com.cn.shike.pojo.RestOrder;
import com.cn.shike.pojo.User;
import com.cn.shike.pojo.UserOrder;
import com.cn.shike.service.IOrderService;
import com.cn.shike.service.IRestOrderService;
import com.cn.shike.service.IUserOrderService;
import com.cn.shike.service.IUserService;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RunWith(SpringJUnit4ClassRunner.class)		//表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})

public class TestMyBatis {
        private static Logger logger = Logger.getLogger(TestMyBatis.class);
        //	private ApplicationContext ac = null;
        @Resource
        private IUserService userService = null;

        @Resource
        private IRestOrderService restOrderService;


        @Resource
        private IOrderService orderService;

        @Resource
        private IUserOrderService userOrderService;

        @Resource
        private RestOrderMapper restOrderDao;
//	@Before
//	public void before() {
//		ac = new ClassPathXmlApplicationContext("applicationContext.xml");
//		userService = (IUserService) ac.getBean("userService");
//	}

        @Test
        public void test1() {
                RestOrder restOrder = new RestOrder();
                restOrder.setOrderId(60);
                restOrderDao.deleteUserOrder(restOrder);
        }

        @Test
        public void test2() {
                RestOrder restOrder = new RestOrder();
                restOrder.setOrderId(60);
                restOrderDao.deleteRestOrder(restOrder);
        }


        @Test
        public void test3(){

                UserOrder userOrder = new UserOrder();
                userOrder.setUserId(15);
                List<Map> userIds =userOrderService.findMyOrder(userOrder);

                for( Map userIdstemp: userIds){
                        System.out.println(userIdstemp);
                }

        }

        @Test
        public void test4(){
                int user_id = 15;
                int order_id = 40;
                int now_number = 1;
                int sum_number = 5;
                UserOrder userOrder = new UserOrder();
                userOrder.setUserId(user_id);
                userOrder.setOrderId(order_id);

                if(sum_number == now_number ){

                }else if(sum_number > now_number){
                        try {
                                userOrderService.addUserOrder(userOrder);
                        } catch (Exception e) {
                                e.printStackTrace();
                        }
                }

        }
}
