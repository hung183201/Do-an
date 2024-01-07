using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Migrations
{
    public partial class MyFirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HOTEL_UTILITIES",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ID_UTILITIES = table.Column<int>(type: "int", nullable: true),
                    ID_HOTEL = table.Column<int>(type: "int", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiTao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdNguoiTao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayCapNhat = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiCapNhat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdNguoiCapNhat = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HOTEL_UTILITIES", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HOTEL_UTILITIES_UTILITIES",
                        column: x => x.ID_UTILITIES,
                        principalTable: "UTILITIES",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ROOM_UTILITIES_HOTEL",
                        column: x => x.ID_HOTEL,
                        principalTable: "HOTEL",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HOTEL_UTILITIES_ID_HOTEL",
                table: "HOTEL_UTILITIES",
                column: "ID_HOTEL");

            migrationBuilder.CreateIndex(
                name: "IX_HOTEL_UTILITIES_ID_UTILITIES",
                table: "HOTEL_UTILITIES",
                column: "ID_UTILITIES");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HOTEL_UTILITIES");
        }
    }
}
