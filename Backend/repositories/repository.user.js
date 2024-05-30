const { Console } = require("console");
const { pool } = require("../db/pgConnect");
const crypto = require("crypto");

const {
  setLoggedInUserId,
  getLoggedInUserId,
} = require("../controller/usersession");

async function signup(req, res) {
  const { username, password, email, divisi } = req.body;
  try {
    if (!username || !password || !email || !divisi) {
      return res
        .status(400)
        .send("All fields are required: username, password, email, divisi");
    }
    let hashedPassword;
    if (password) {
      hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("base64")
        .slice(0, 32);
      /* console.log(
        `Password before hash: ${password}\nPassword after hash: ${hashedPassword}`
      ); */
    }
    const duplicate = await pool.query(
      "SELECT * FROM USERS WHERE USERNAME = $1",
      [username]
    );
    if (duplicate.rows.length > 0) {
      return res.status(200).send("Username already exists");
    }
    let divisi_id;
    if (divisi) {
      divisi_id = await pool.query(
        "SELECT DIVISI_ID FROM DIVISI WHERE NAME = $1",
        [divisi]
      );
      if (divisi_id.rows.length === 0) {
        return res.status(404).send("Divisi Not Found");
      }
    }

    const result = await pool.query(
      "INSERT INTO USERS (USERNAME,PASSWORD,EMAIL) VALUES ($1,$2,$3) RETURNING USER_ID, USERNAME, EMAIL",
      [username, hashedPassword, email]
    );

    const userId = result.rows[0].user_id;

    if (divisi_id) {
      await pool.query(
        "INSERT INTO USER_DIVISI (USER_ID,DIVISI_ID) VALUES($1,$2)",
        [userId, divisi_id.rows[0].divisi_id]
      );
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res
        .status(400)
        .send("All fields are required: username, password");
    }
    let hashedPassword;
    if (password) {
      hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("base64")
        .slice(0, 32);
      /* console.log(
          `Password before hash: ${password}\nPassword after hash: ${hashedPassword}`
        ); */
    }
    result = await pool.query(
      "SELECT user_id,username,password FROM USERS WHERE USERNAME = $1",
      [username]
    );
    if (result) {
      if (result.rows[0].password == hashedPassword) {
        const LoggedInId = result.rows[0].user_id;
        setLoggedInUserId(req, LoggedInId);
        //console.log(getLoggedInUserId(req));
        res.status(200).send(result.rows[0]);
      } else {
        res.status(401).send("Invalid Password");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function request(req, res) {
  try {
    const { title, up_time, insidental, kanal, notes, file_path } = req.body;
    let requester_id;
    if (getLoggedInUserId(req)) {
      requester_id = getLoggedInUserId(req);
      console.log(requester_id);
    } else {
      return res.status(440).send("Login session expired");
    }
    if (!title || !up_time || !insidental || !kanal) {
      return res
        .status(400)
        .send(
          "All fields are required: title, up_date, insidental, kanal, file_path"
        );
    }
    let request_result;

    if (file_path) {
      request_result = await pool.query(
        "INSERT INTO KONTEN (REQUESTER_ID,TITLE,UP_TIME,INSIDENTAL,KANAL,FILE_PATH) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
        [requester_id, title, up_time, insidental, kanal, file_path]
      );
    } else {
      request_result = await pool.query(
        "INSERT INTO KONTEN (REQUESTER_ID,TITLE,UP_TIME,INSIDENTAL,KANAL) VALUES ($1,$2,$3,$4,$5) RETURNING *",
        [requester_id, title, up_time, insidental, kanal]
      );
    }
    const kontenId = request_result.rows[0].konten_id;
    await pool.query("INSERT INTO QUALITY_CONTROL (KONTEN_ID) VALUES ($1)",[kontenId]);
    res.status(200).send(request_result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { signup, login, request };
