import util from './util';
const vfilter = {
	formatPhone (val) {
        return util.formatPhone(val);
    },
    filterDate (val) {
		return util.formatDateByNow(val);
	}
}
export default vfilter;