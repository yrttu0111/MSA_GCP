import {
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import axios from 'axios';

/* import 결제 프로세스 docs 참고
관리자 페이지에서 환불및 결제 확인 가능
*/

@Injectable()
export class IamportService {
  async getToken() {
    try {
      const result = await axios.post('https://api.iamport.kr/users/getToken', {
        imp_key: process.env.IMP_KEY,
        imp_secret: process.env.IMP_SECRET,
      });
      return result.data.response.access_token;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }

  async checkPaid({ impUid, amount, imp_token }) {
    try {
      const result = await axios.get(
        `https://api.iamport.kr/payments/${impUid}`,
        {
          headers: { Authorization: imp_token },
        },
      );
      if (result.data.response.status !== 'paid')
        throw new HttpException('결제가 완료되지 않았습니다.', 400);
      if (result.data.response.amount !== amount)
        throw new HttpException('결제금액이 일치하지 않습니다.', 400);
      console.log(result.data.response.amount);

      return result.data.response;
    } catch (error) {
      if (error?.response?.data?.message) {
        throw new HttpException(
          error.response.data.message,
          error.response.status,
        );
      } else {
        throw error;
      }
    }
  }

  async cancelPayment({ impUid, imp_token }) {
    try {
      const result = await axios.post(
        `https://api.iamport.kr/payments/cancel`,
        {
          imp_uid: impUid,
          reason: '취소요청에 의해 취소되었습니다.',
        },
        {
          headers: { Authorization: imp_token },
        },
      );
      return result.data.response.cancel_amount;
    } catch (error) {
      if (error?.response?.data?.message) {
        throw new HttpException(
          error.response.data.message,
          error.response.status,
        );
      } else {
        throw error;
      }
    }
  }
}
