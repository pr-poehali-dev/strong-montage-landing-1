import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта на почту info@strong-montage.ru"""

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    try:
        body = json.loads(event.get('body') or '{}')
    except Exception:
        return {'statusCode': 400, 'headers': cors_headers, 'body': json.dumps({'error': 'Invalid JSON'})}

    name = (body.get('name') or '').strip()
    phone = (body.get('phone') or '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': cors_headers,
            'body': json.dumps({'error': 'Имя и телефон обязательны'})
        }

    smtp_host = os.environ.get('SMTP_HOST', 'smtp.yandex.ru')
    smtp_user = os.environ['SMTP_USER']
    smtp_password = os.environ['SMTP_PASSWORD']
    recipient = 'info@strong-montage.ru'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта: {name}'
    msg['From'] = smtp_user
    msg['To'] = recipient

    html = f"""
    <html><body style="font-family: Arial, sans-serif; color: #222;">
      <h2 style="color: #FF6B00;">Новая заявка с сайта strongmontage.ru</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 480px;">
        <tr>
          <td style="padding: 10px 16px; background: #f5f5f5; font-weight: bold; width: 120px;">Имя</td>
          <td style="padding: 10px 16px; border-bottom: 1px solid #eee;">{name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; background: #f5f5f5; font-weight: bold;">Телефон</td>
          <td style="padding: 10px 16px;"><a href="tel:{phone}" style="color: #FF6B00;">{phone}</a></td>
        </tr>
      </table>
    </body></html>
    """

    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL(smtp_host, 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, recipient, msg.as_string())

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'ok': True})
    }
