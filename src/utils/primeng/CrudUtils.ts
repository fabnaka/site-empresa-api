import { OrderItem } from "sequelize/types";
import { Op } from "sequelize";

export default class CrudUtils {

  private constructor() { }

  static processFilters(filters:any, add:any) {
    let where:any = {};
    for (let key in filters) {
      if (key === 'name' || key === 'nome') {
        where[key] = { [Op.like]: '%' + filters[key].value + '%' }
      } else {
        where[key] = filters[key].matchMode === 'bt' ? { [Op.between]: [filters[key].value[0], filters[key].value[1]] } 
        : filters[key].matchMode === 'gt' ? filters[key].value 
        : filters[key].matchMode === 'in' ? { [Op.in]: filters[key].value }
        : filters[key].matchMode === 'nlk'? { [Op.notLike]: filters[key].value }
        : { [Op.like]: `%${filters[key].value}%` };
      }
    }

    for (let i in add) {
      where[i] = add[i];
    }

    return where;
  }

  static getOrder(options:any): OrderItem[] | undefined {
    if (options.sortField === undefined) {
      return undefined;
    };

    return [[options.sortField, (options.sortOrder == 1 ? 'ASC' : 'DESC')]];
  }

  static underlineStrategy(obj:any) {
    switch (Object.prototype.toString.call(obj)) {
      case "[object Object]":
        for (let i in obj) {
          if (i.indexOf(".") !== -1) {
            let valTmp = obj[i];
            let cmpTmp = i.split('.').join('_');
            delete obj[i];
            obj[cmpTmp] = valTmp;
          }
        }
        break;
      case "[object Array]":
        for (let i in obj) {
          obj[i] = this.underlineStrategy(obj[i]);
        }
        break;
    }
    return obj;
  }
}