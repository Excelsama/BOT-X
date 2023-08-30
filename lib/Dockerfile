FROM quay.io/suhailtechinfo/suhail
RUN git clone https://github.com/Bladeh4x/BLADE-MD /root/BLADE-MD
WORKDIR /root/BLADE-MD/
RUN npm install
RUN yarn install --network-concurrency 1
EXPOSE 8000
CMD ["npm", "start"]
