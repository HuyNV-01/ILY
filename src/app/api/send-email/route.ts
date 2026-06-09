// app/api/send-email/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST() {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const emailCoAy = 'nguyenhue220625@gmail.com'; 
    const emailCuaAnh = process.env.EMAIL_USER;

    const mailOptions = {
      from: `"Hành Trình Hạnh Phúc" <${process.env.EMAIL_USER}>`,
      to: [emailCuaAnh, emailCoAy].join(', '), 
      subject: '🎉 Thông báo khẩn: Nhân vật VIP đã lên chuyến hành trình!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 2px dashed #fbcfe8; border-radius: 15px; background-color: #fdfbf7;">
          <h2 style="color: #db2777; text-align: center;">Xác nhận vé VIP thành công! 🎟️💖</h2>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; text-align: justify;">
            Chào hai bạn,<br><br>
            Hệ thống xin trân trọng thông báo: Nhân vật VIP đã chính thức ấn nút <b>"Đồng ý"</b>. Hành trình hạnh phúc của hai bạn đã chính thức bắt đầu!
            <br><br>
            Hãy chuẩn bị tinh thần cho một hành trình đầy ắp yêu thương, tiếng cười và những khoảnh khắc ngọt ngào bên nhau nhé! 🚀💕
            <br><br>
            Hai con người, hai trái tim, một hành trình. Hãy cùng nhau viết nên câu chuyện tình yêu đẹp nhất!
          </p>

          <div style="margin: 35px auto; max-width: 400px; background: linear-gradient(to bottom right, #fff0f5, #fce7f3); border: 2px solid #fbcfe8; border-radius: 20px; padding: 25px 20px; text-align: center; box-shadow: 0 8px 15px rgba(251, 207, 232, 0.4);;">
            
            <div style="margin-bottom: 15px;">
              <p style="margin: 0; font-size: 22px; color: #be185d; font-weight: bold; font-family: 'Georgia', serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.05);">
                👨‍💻 Nguyễn Văn Huy
              </p>
              <p style="margin: 4px 0 0 0; font-size: 14px; color: #db2777; font-style: italic; letter-spacing: 1px;">
                (11 - 01 - 2002)
              </p>
            </div>

            <div style="margin: 15px 0; position: relative;">
              <span style="position: relative; z-index: 2; background-color: #fce7f3; padding: 0 15px; font-size: 28px;">
                💞
              </span>
            </div>

            <div style="margin-top: 15px;">
              <p style="margin: 0; font-size: 22px; color: #be185d; font-weight: bold; font-family: 'Georgia', serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.05);">
                👸 Nguyễn Hoàng Huế
              </p>
              <p style="margin: 4px 0 0 0; font-size: 14px; color: #db2777; font-style: italic; letter-spacing: 1px;">
                (22 - 06 - 2005)
              </p>
            </div>

          </div>
          <div style="background-color: #fce7f3; padding: 15px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 0; color: #be185d; font-weight: bold;">⏰ Thời gian xác nhận: ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}</p>
            <p style="margin: 5px 0 0 0; color: #be185d; font-weight: bold;">📍 Trạng thái: Yêu thương đong đầy</p>
          </div>
          
          <p style="color: #374151; font-size: 16px; font-style: italic; text-align: center;">
            "Chúc cả hai có một hành trình thật tuyệt vời, luôn nắm chặt tay nhau đi qua mọi giông bão nhé!"
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Đã gửi mail thành công!' });
  } catch (error) {
    console.error('Lỗi khi gửi mail:', error);
    return NextResponse.json({ success: false, error: 'Không thể gửi mail' }, { status: 500 });
  }
}