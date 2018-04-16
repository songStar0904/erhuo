import util from './util';
const vfilter = {
	formatPhone (val) {
        return util.formatPhone(val);
    },
    filterDate (val) {
		return util.formatDateByNow(val);
	},
	formatSid (val) {
		return util.formatSchool(val);
	},
	formatSex (val) {
		return util.formatSex(val);
	}
}
export default vfilter;