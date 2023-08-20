FROM quay.io/sampandey001/secktor
RUN git clone https://github.com/Bladeh4x/BLADE-ME /root/blade-md
WORKDIR /root/blade-md/
RUN npm install npm@latest
RUN yarn install --network-concurrency 1
EXPOSE 8000
CMD ["npm", "start"]
