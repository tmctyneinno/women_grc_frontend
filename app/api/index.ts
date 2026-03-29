import auth from "./end_points/auth";
import cart from "./end_points/cart";
import event from "./end_points/event";
import membership from "./end_points/membership";
import user from "./end_points/user";
import learning from "./end_points/learning";
import forum from "./end_points/forum";


export default {
    ...auth,
    ...user,
    ...event,
    ...cart,
    ...membership,
    ...learning,
    ...forum,
}
