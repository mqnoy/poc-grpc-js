const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { wrapperValueToNull } = require("./utils");

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, "versioning.proto"),
  {
    keepCase: false,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);
const grpcProto = grpc.loadPackageDefinition(packageDefinition).versioning;

function main() {
  const client = new grpcProto.VersioningService(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  const request = {
    dataVersion: "1.0.0",
  };

  client.getVersionProperties(request, (err, resp) => {
    if (err) {
      console.error("RPC error:", err);
      return;
    }

    const mm = resp.result.map((r) => wrapperValueToNull(r));
    console.log("result:", mm);
  });
}

main();
