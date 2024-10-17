import axios, { AxiosRequestConfig } from "axios";

export namespace ComparadorDigitalConnection {
  //const url = `https://localhost:7274/FingerPrint`;
  const url = `http://svc-presenca-digital-comparador-hom/FingerPrint`;

  export async function comparador(img1: string, img2: string) {
    let data = {
      img1: img1,
      img2: img2,
    };

    const config: AxiosRequestConfig = {
      url,
      method: "POST",
      data,
      timeout: 15000,
    };

    try {
      const res = await axios(config);

      if (res.status !== 200) {
        throw new Error(
          `Não foi possível realizar a comunicação com o equipamento.`
        );
      }

      return res.data;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
