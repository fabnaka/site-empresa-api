import { ContextInterface, SessionToken } from "../types";
import TokenUtils from "./token/TokenUtils";

export const contextParser = async ({
  req,
  res,
  connection
}: {req: any, res: any, connection:any}): Promise<ContextInterface> => {
  if (!req || !req.headers) {
    return connection.context;
  }

  try {
    const authHeader: string = req.headers.authorization;
    return { ...(await splitHeader(authHeader)), ...getAgentInfo(req) };
  } catch (error) {
    return {
      ...getAgentInfo(req),
      usuario: undefined,
    };
  }
};

export const wsContextParser = async (
  header: string
): Promise<ContextInterface> => {
  try {
    const authHeader: string = header;

    return await splitHeader(authHeader);
  } catch (error) {
    return {
      usuario: undefined,
    };
  }
};

const getAgentInfo = (req: any): { ipAdress: string; userAgent: string } => {
  return {
    ipAdress: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
    userAgent: req.headers["user-agent"],
  };
};

const splitHeader = async (authHeader: string): Promise<ContextInterface> => {
  if (authHeader) {
    let content = authHeader.split(" ");

    if (content.length === 2) {
      let session = await TokenUtils.decode<SessionToken>(content[1]);

      return {
        usuario: {
          ...session,
          token: content[1],
        },
      };
    }
  }

  return {
    usuario: undefined,
  };
};
