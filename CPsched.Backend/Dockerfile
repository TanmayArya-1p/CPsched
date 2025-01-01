
FROM python:3.10

WORKDIR /app

COPY requirements.txt .

RUN  pip install --no-cache-dir -r requirements.txt

RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    --no-install-recommends

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' && \
    apt-get update && \
    apt-get install -y google-chrome-stable
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
COPY . .
EXPOSE 5000
CMD ["fastapi", "run", "main.py", "--port", "5000"]