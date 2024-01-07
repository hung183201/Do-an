using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Migrations
{
    public partial class aspnetcore2023 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HOTEL_UTILITIES_UTILITIES",
                table: "HOTEL_UTILITIES");

            migrationBuilder.DropForeignKey(
                name: "FK_ROOM_UTILITIES_HOTEL",
                table: "HOTEL_UTILITIES");

            migrationBuilder.AlterColumn<int>(
                name: "ID_UTILITIES",
                table: "HOTEL_UTILITIES",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ID_HOTEL",
                table: "HOTEL_UTILITIES",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NAME_SERVICE = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PRICE = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiTao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdNguoiTao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayCapNhat = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiCapNhat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdNguoiCapNhat = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BOOKING_SERVICES",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ID_BOOKING = table.Column<int>(type: "int", nullable: true),
                    ID_SERVICES = table.Column<int>(type: "int", nullable: true),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiTao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdNguoiTao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayCapNhat = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiCapNhat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdNguoiCapNhat = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BOOKING_SERVICES", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BOOKING_BooKingServices",
                        column: x => x.ID_BOOKING,
                        principalTable: "BOOKING",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BooKingServices_Services",
                        column: x => x.ID_SERVICES,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BOOKING_SERVICES_ID_BOOKING",
                table: "BOOKING_SERVICES",
                column: "ID_BOOKING");

            migrationBuilder.CreateIndex(
                name: "IX_BOOKING_SERVICES_ID_SERVICES",
                table: "BOOKING_SERVICES",
                column: "ID_SERVICES");

            migrationBuilder.AddForeignKey(
                name: "FK_HOTEL_UTILITIES_UTILITIES",
                table: "HOTEL_UTILITIES",
                column: "ID_UTILITIES",
                principalTable: "UTILITIES",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ROOM_UTILITIES_HOTEL",
                table: "HOTEL_UTILITIES",
                column: "ID_HOTEL",
                principalTable: "HOTEL",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HOTEL_UTILITIES_UTILITIES",
                table: "HOTEL_UTILITIES");

            migrationBuilder.DropForeignKey(
                name: "FK_ROOM_UTILITIES_HOTEL",
                table: "HOTEL_UTILITIES");

            migrationBuilder.DropTable(
                name: "BOOKING_SERVICES");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.AlterColumn<int>(
                name: "ID_UTILITIES",
                table: "HOTEL_UTILITIES",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ID_HOTEL",
                table: "HOTEL_UTILITIES",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_HOTEL_UTILITIES_UTILITIES",
                table: "HOTEL_UTILITIES",
                column: "ID_UTILITIES",
                principalTable: "UTILITIES",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ROOM_UTILITIES_HOTEL",
                table: "HOTEL_UTILITIES",
                column: "ID_HOTEL",
                principalTable: "HOTEL",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
